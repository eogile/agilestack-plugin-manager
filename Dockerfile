FROM centurylink/ca-certs
MAINTAINER EOGILE "agilestack@eogile.com"

ENV name plugin-manager

ENV workdir /plugin

EXPOSE 8080
ENV HTTP_PORT 8080
LABEL SERVICE_TAGS="urlprefix-/plugins" \
      SERVICE_CHECK_HTTP="/status" \
      SERVICE_CHECK_INTERVAL="10s"

WORKDIR $workdir
ADD $name $workdir/$name
ADD public $workdir/public
ADD src $workdir/src

CMD ["./plugin-manager"]
