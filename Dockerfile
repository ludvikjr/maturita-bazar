FROM node

LABEL maintrainer="ludvikjr"

EXPOSE 3000

COPY ./src/frontend /tmp/frontend
COPY ./src/backend /tmp/backend
COPY start.sh /usr/local/bin/

RUN cd /tmp/frontend; npm install; npm run build;

ENTRYPOINT [ "/usr/local/bin/start.sh" ]

