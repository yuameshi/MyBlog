---
title: IIS反向代理_基础方法以及某些小坑
tags:
  - IIS
  - Web
  - Windows
  - Windows Server
  - 伪*Server运维
  - 学习心得
  - 开发
  - 知识
  - 系统
  - 经验分享
id: '554'
categories:
  - - 伪*Server运维
  - - 开发
date: 2021-08-10 11:32:12
---

# 使用反向代理

使用反向代理的方法很简单，网上[一搜一大把](https://cn.bing.com/search?q=IIS+%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%8)。

大致就是：

## 下载并安装Microsoft Web Platform Installer

地址：[https://www.microsoft.com/web/downloads/platform.aspx](https://www.microsoft.com/web/downloads/platform.aspx)

一直下一步就可以安装完成。

## 安装反向代理模块

打开Web PI，然后在右上角输入`ARR`然后回车搜索，选中`Application Request Router 3.0 Beta (英语)`，点击`添加`，再点击`安装`，并在随后出现的对话框中点击`我接受`，如图所示：

![](/wp-content/uploads/2021/08/7JAHUSLO5XGT_TTIU112.png)

添加ARR到待安装列表

![](/wp-content/uploads/2021/08/OYS@Z7ZD82023SF1.png)

安装ARR

# 配置反向代理

依次进入本地服务器页面(`起始页`下方的页面)，`Application Request Routing`页面。并在右侧找到`Proxy Settings`，进入此页面。

勾选`Enable Proxy`，然后保存。

## 这里有一个坑 参见[此处](#rewrite-host-header)

![](/wp-content/uploads/2021/08/TYJSPZIXU7IYHMR78.png)

配置ARR

然后去你的反向代理服务器页面，找到`URL重写`，在右侧找到`添加规则`，随后在弹出来对话框内选择`反向代理`并继续。

![](/wp-content/uploads/2021/08/9U7F7ZJ39PV05PZUB.png)

添加规则

在随后出现的对话框内输入被反向代理的服务器地址即可。

# 坑の聚集处(其实现在只有一个)

## #1 请决定是否打开 Reverse rewrite host in response

此选项用于将被反向代理的页面的重定向(301)请求的Location标头地址的主机替换成自身位置。（哎呀我也解释不清楚举个例子罢）  
举例：  
假设 `127.0.0.1` 是我们的反向代理服务器， `example.com`为被代理服务器，勾选`Reverse rewrite host in response headers` 之后

标头：`Location: https://example.com/XXXXXX`  
就会被替换成：`Location: http://127.0.0.1/XXXXXX`  
有时候被代理服务器确实要跳转第三方页面，不关闭此选项就会造成跳转到被代理服务器不存在的页面，从而出现404错误。  
你也可以可以看我这个亲身例子  
[https://github.com/reruin/sharelist/issues/561](https://github.com/reruin/sharelist/issues/561)