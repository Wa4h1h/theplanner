FROM node:alpine
RUN mkdir frontend_theplanner
WORKDIR /frontend_theplanner
COPY package.json  ./
COPY package-lock.json ./
COPY . ./
RUN npm update --force
RUN npm install
ENTRYPOINT ["npm","start"]