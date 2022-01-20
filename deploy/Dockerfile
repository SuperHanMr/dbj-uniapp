FROM registry-vpc.cn-beijing.aliyuncs.com/dabanjia/nginx:20210413_1535
RUN mkdir /mp-h5
ADD dist /mp-h5/dist
RUN sed -i 's/\/usr\/share\/nginx\/html/\/mp-h5\/dist/g' /etc/nginx/conf.d/default.conf
EXPOSE 80 443
