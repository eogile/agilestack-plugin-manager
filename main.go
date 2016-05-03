package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	pb "github.com/eogile/agilestack-core/proto"
	"github.com/eogile/agilestack-utils/plugins"
	"github.com/golang/protobuf/jsonpb"
	"github.com/nats-io/nats"
)

const (
	pluginName      = "agilestack-plugin-manager"
	defaultHttpPort = "8080"
)

var jsonpbMarshaler jsonpb.Marshaler

type plugin struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

var connection *nats.EncodedConn

/*
 * Run listening server
 */
func startHttp() {
	httpPort := os.Getenv("HTTP_PORT")
	if httpPort == "" {
		httpPort = defaultHttpPort
	}
	http.HandleFunc("/status", plugins.HandleHttpStatusUrl)
	http.HandleFunc("/plugins/availablePlugins", handleAvailablePlugins)
	http.HandleFunc("/plugins/installedPlugins", handleInstalledPlugins)
	http.HandleFunc("/plugins/", handlePlugins)
	http.Handle("/", http.FileServer(http.Dir("/plugin/public")))
	log.Printf("Server static files from /plugin/public")

	log.Println("Server started: http://localhost:" + httpPort)
	err := http.ListenAndServe(":"+httpPort, nil)
	if err != nil {
		log.Fatal("HTTP start error", err)
	}

}

// Handle available plugins
func handleAvailablePlugins(w http.ResponseWriter, r *http.Request) {
	log.Printf("r.RequestURI = %s", r.RequestURI)

	var plugins = pb.Plugins{}
	err := connection.Request(pb.ListAvailablePluginsTopic,
		&pb.Empty{}, &plugins, 10*time.Second)
	if err != nil {
		log.Printf("could not ListAvailablePlugins: %v", err)
		http.Error(w, "Error while listing available plugins", http.StatusInternalServerError)
		return
	}

	countAvailablePlugins := len(plugins.Plugins)
	log.Printf("in BackOfficePlugin, server found %d available Plugins", countAvailablePlugins)

	switch r.Method {
	case "GET":
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Cache-Control", "no-cache")
		// stream the contents of the Plugins
		jsonpbMarshaler.Marshal(w, &plugins)

	default:
		// Don't know the method, so error
		http.Error(w, fmt.Sprintf("Unsupported method: %s", r.Method), http.StatusMethodNotAllowed)
	}
}

// Handle installed plugins
func handleInstalledPlugins(w http.ResponseWriter, r *http.Request) {
	//TODO refactor with handleAvailablePlugins
	log.Printf("r.RequestURI = %s", r.RequestURI)

	var plugins = pb.Plugins{}
	err := connection.Request(pb.ListInstalledPluginsTopic,
		&pb.Empty{}, &plugins, 10*time.Second)

	if err != nil {
		log.Printf("could not ListInstalledPlugins: %v", err)
		http.Error(w, "Error while listing installed plugins", http.StatusInternalServerError)
		return
	}
	countInstalledPlugins := len(plugins.Plugins)
	log.Printf("in BackOfficePlugin, server found %d installed Plugins", countInstalledPlugins)

	switch r.Method {
	case "GET":
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Cache-Control", "no-cache")
		// stream the contents of the Plugins
		jsonpbMarshaler.Marshal(w, &plugins)

	default:
		// Don't know the method, so error
		http.Error(w, fmt.Sprintf("Unsupported method: %s", r.Method), http.StatusMethodNotAllowed)
	}
}

func handlePlugins(w http.ResponseWriter, r *http.Request) {
	log.Printf("r.RequestURI = %s with method %s", r.RequestURI, r.Method)
	decoder := json.NewDecoder(r.Body)

	switch r.Method {
	case "POST":
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Cache-Control", "no-cache")
		installRequest := &pb.InstallPluginRequest{}
		err := decoder.Decode(installRequest)
		log.Println("in handle Plugin, Plugin to install : ", installRequest.Plugin.Name)

		if err != nil {
			message := fmt.Sprintf("got an error when trying to decode POST BODY of plugins %v", err)
			log.Print(message)
			http.Error(w, message, http.StatusBadRequest)
		} else {
			//TODO netReponse handling

			var result = pb.NetResponse{}
			errInstall := connection.Request(pb.InstallPluginTopic,
				installRequest, &result, 10*time.Second)

			if errInstall != nil {
				message := fmt.Sprintf("Got error when asking core to install %s, %v", installRequest.Plugin.Name, errInstall)
				log.Print(message)
				http.Error(w, message, http.StatusInternalServerError)
			} else if result.Response == pb.Responses_ERROR {
				message := fmt.Sprintf("Got error when asking core to install %s, %v", installRequest.Plugin.Name, result.Details)
				log.Print(message)
				http.Error(w, message, http.StatusInternalServerError)
			} else {
				jsonpbMarshaler.Marshal(w, installRequest.Plugin)
			}
		}

	case "DELETE":
		plugin := &pb.Plugin{}
		err := decoder.Decode(plugin)
		if err != nil {
			message := fmt.Sprintf("got an error when trying to decode DELETE BODY of plugins %v", err)
			log.Println(message)
			http.Error(w, message, http.StatusBadRequest)
		} else {
			var result = pb.NetResponse{}
			errUninstall := connection.Request(pb.UninstallPluginTopic,
				plugin, &result, 10*time.Second)

			if errUninstall != nil {
				message := fmt.Sprintf("Got error when asking core to uninstall %s : %v", plugin.Name, errUninstall)
				log.Println(message)
				http.Error(w, message, http.StatusInternalServerError)
			} else if result.Response == pb.Responses_ERROR {
				message := fmt.Sprintf("Got error when asking core to uninstall %s, %v", plugin.Name, result.Details)
				log.Print(message)
				http.Error(w, message, http.StatusInternalServerError)
			} else {
				//ok uninstalled
				jsonpbMarshaler.Marshal(w, &result)
			}
		}
	default:
		// Don't know the method, so error
		http.Error(w, fmt.Sprintf("Unsupported method: %s", r.Method), http.StatusMethodNotAllowed)
	}
}

func main() {

	/*
	 * Establishing the connection to the NATS server
	 */
	var err error
	connection, err = plugins.EstablishConnection("nats://nats.agilestacknet:4222")
	if err != nil {
		log.Fatal("Error while connecting to the Nats server :", err)
	}

	// Initialize jsonpb Marshaller
	jsonpbMarshaler = jsonpb.Marshaler{}
	jsonpbMarshaler.Indent = "  "

	//Run listening server
	startHttp()

}
