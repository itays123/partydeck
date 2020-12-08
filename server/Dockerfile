FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl unzip

RUN curl -fsSL https://deno.land/x/install/install.sh | sh
RUN ln -s /root/.deno/bin/deno /usr/local/bin

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

CMD ["deno", "run", "-A", "mod.ts"]