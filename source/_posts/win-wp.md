---
title: Windows+IIS环境下配置WordPress教程
tags:
  - MySQL
  - PHP
  - WordPress
  - 制作过程
  - 学习
  - 学习心得
  - 技术宅
  - 知识
  - 经验分享
  - 野生技术协会
id: '102'
categories:
  - - 伪*Server运维
  - - 开发
  - - 日常
date: 2021-02-18 12:15:00
---

**Part 0:环境准备**

 **0.0安装VC运行库**

        这个……不用多说了吧。

        M$官方下载页面：[https://support.microsoft.com/zh-cn/topic/%E6%9C%80%E6%96%B0%E6%94%AF%E6%8C%81%E7%9A%84-visual-c-%E4%B8%8B%E8%BD%BD-2647da03-1eea-4433-9aff-95f26a218cc0](https://support.microsoft.com/zh-cn/topic/%E6%9C%80%E6%96%B0%E6%94%AF%E6%8C%81%E7%9A%84-visual-c-%E4%B8%8B%E8%BD%BD-2647da03-1eea-4433-9aff-95f26a218cc0)

        x86：[https://aka.ms/vs/16/release/vc\_redist.x86.exe](https://aka.ms/vs/16/release/vc_redist.x86.exe)

        x64：[https://aka.ms/vs/16/release/vc\_redist.x64.exe](https://aka.ms/vs/16/release/vc_redist.x64.exe)

#     0.1下载MySQL

        WordPress需要MySQL作为数据库来储存我们的文章，所以我们需要准备MySQL。

        它可以在 [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/) 得到，点击"Download"下载，此时他会弹出一个页面问你是否要注册Oracle账户，您可以按需注册，但在这里我们不需要，单击"**No thanks, just start my download.**"后就可以跳过

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/28f1109c2729d579f2e8ba899e857d4a5dbacac9.png@1320w_710h.webp)

下载MySQL

            \*为确保你的数据安全与稳定性, 我建议您在下载完毕后对比文件效验码(MD5)以检验文件完整性。

        配置环境变量：

        使用CMD/Power Shell或"运行"对话框，启动`SystemPropertiesAdvanced.exe`。

        创建系统环境变量，如下图

        变量名："`MYSQL_HOME`"

        变量值为MySQL根目录，如图所示

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/d260fa18230a3c014a1eb8feae62cc0bd33b2ac9.png@1320w_706h.webp)

配置环境变量

        在"MySQL"下载好后将其解压到你喜欢的目录

            \*我们十分建议您将解压目录中的"**mysql-8.0.23-winx64**"字串删除，否则将会出现一层多余的目录。

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/730bb61077b7b266a9c91762dd42de291fce84ea.png@1320w_696h.webp)

解压MySQL到你喜欢的目录

        在解压完成后，启动管理员命令提示符，进入MySQL根目录，并通过命令`CD`进入**bin**文件夹，如图

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/43134f4a8cd7bb02921bd77718855c5227b5b465.png@1320w_714h.webp)

        键入`mysqld --initialize-insecure --user=mysql`，并回车以初始化MySQL的data目录，此时您大可以回到上一级目录确认其是否已经被生成。

        继续键入`mysqld -install`，并回车以安装系统服务。

        继续键入`net start MySQL`，以启动MySQL服务，如下图所示。

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/a79153c2b538592ae2482e95480c086eebfd8cad.png@1320w_666h.webp)

这是一个正常的安装结果

        至此，MySQL的安装与初始化就结束了，当您请不要关闭命令窗口，继续键入`mysql -u root -p`，此时将提示您输入您的密码，初始密码为空，直接回车即可

            \*\*注意，以下所有的命令都需要**带分号**，**大小写不敏感**，但对于**密码**是**大小写敏感**的。

        为确保安全，我们建议您在登陆后第一时间修改root账户的密码，如图所示，键入**`alter user 'root'@'localhost' identified with mysql_native_password by '你要改的密码';`**(带分号)，其中`'你要改的密码'`请替换为你要改的密码。

        继续键入`create database wordpress_db;`，以创建一个独立的WordPress数据库

        继续键入`**create user 'wordpress_user'@'localhost' identified by 'password**';`给WordPress创建独立的用户。(`password`为用户密码，不建议设置这个密码)

        继续键入**`grant all privileges  on wordpress_db.* to "wordpress_user"@'localhost';`**

    ​    ​以授予WordPress用户对于WordPress数据库的所有权限(除了root独有的grant命令)。

        继续键入"exit"，或"quit"退出，以上操作如图所示。

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/b3e296c312f38e510f8bf379fea04c554875c2e6.png@1320w_666h.webp)

在MySQL中的操作

#     0.2 配置PHP环境

        PHP可以从[https://windows.php.net/download/](https://windows.php.net/download/)下载，但请不要选择最新的PHP 8.0 (8.0.1)，因为此版本刚推出不久，许多应用程序/主题尚未适配，WordPress也只是**对其兼容**。

        一样，下载完成后解压。复制一份**`php.ini-production`**，并将其重命名为"php.ini"然后将其打开，并将其进行下列图1~3的改动，进行图4的添加，添加内容我会在下方打出来。

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/cabab8fe11a336d8e4dcc80e6c4a80f6fcb6856e.png@1320w_702h.webp)

```
extension=bz2
 extension=com_dotnet
 extension=curl
 extension=dba
 extension=enchant
 extension=exif
 extension=ffi
 extension=fileinfo
 extension=ftp
 extension=gd2
 extension=gettext
 extension=gmp
 extension=imap
 extension=intl
 extension=ldap
 extension=mbstring
 extension=mysqli
 extension=oci8_12c
 extension=odbc
 extension=opcache
 extension=openssl
 extension=pdo_firebird
 extension=pdo_mysql
 extension=pdo_oci
 extension=pdo_odbc
 extension=pdo_pgsql
 extension=pdo_sqlite
 extension=pgsql
 extension=phpdbg_webhelper
 extension=shmop
 extension=snmp
 extension=soap
 extension=sockets
 extension=sodium
 extension=sqlite3
 extension=sysvshm
 extension=tidy
 extension=xmlrpc
 extension=xsl
 extension=zend_test
```

0.3 配置IIS

请按照下图的1~10步依次操作，其中4为下拉框，请注意，5~8请点击右侧的"**…**"并在弹出的文件选择框选择您PHP存放目录下的"**php-cgi.exe**"，最后弹出的确认框请点击**Yes**

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/f0ae5240e5fa94ccb81320b9f6eb731c62c30eac.png@1320w_708h.webp)

IIS添加PHP配置

**1.0WordPress配置**

    ​好了，终于轮到WordPress出场了（超  级  慢  热）

    ​WordPress可以在"[https://wordpress.org/download/#download-install](https://wordpress.org/download/#download-install)"下载

    ​这是直接给的包"**https://wordpress.org/latest.zip**"

    ​但是超  级  慢，还不如建议从Github下载：

    ​仓库地址：[https://github.com/WordPress/WordPress](https://github.com/WordPress/WordPress)

    ​下载完成后，解压，复制所有文件到网站根目录

**1.1：添加站点并进行初步配置（可选）**

    ​首先，如果需要，就新建一个网站，端口随便取，比如说我现在80端口已经有一个，那就加个3300的（如果你是搞域名虚拟主机那就没事了）

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/e61d08ff60fd706764e5f490734673ea6873340c.png@1320w_1040h.webp)

**\*\***为避免出现权限问题，得授予一下Everyone权限

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/fe8f61fe743aa0045ef16c28424776b91e155958.png@908w_1196h.webp)

 **​\*\*\*特别注意：IIS默认的页面没有index.php，所以记得给你的网站添加默认文档（index.php），不然就会出现403**

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/e2464c568cdc8bd3d3c5b9b34c9995a5168be9dc.png@1320w_896h.webp)

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/2cbf1090a2583f27bd455f1fb2e0ca0986fedcda.png@1320w_824h.webp)

**1.2：开始安装WordPress（终）**

    ​首先通过浏览器访问你的服务器**域名**，或外部IP（不然你就得后面改）。

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/3ef8952580004bd075bca5bdda84de17c24803f8.png@1320w_958h.webp)

 **​**然后进行WP著名的5分钟安装程序

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/2f83d9661baddad55c3c5b78c1f3da0cc606d399.png@1320w_774h.webp)

    ​\*\*如果你服务器的硬盘I/O比较慢，那建议在**php.ini**里搜索并修改`max_execution_time`（单位：秒），然后修改为大些的数值，不然会安装失败（得重置数据库）。

    ​在按下"Install WordPress"之后，看到类似下图的界面则证明你成功了

![](https://cdn.jsdelivr.net/gh/Yuameshi/Blog-CDN@main/forwarded-images/bilibili-cv9888796/2c7eb2fce89e3a70defa61fe2495cdbc1d16d809.png@1320w_812h.webp)

    ​然后按"Log In"登录，就可以开始你的WordPress之旅了（逃）。

    ​视频教程：[传送门](https://www.bilibili.com/video/BV1wK4y1s7ve/)或点击下方链接。

    ​这篇文章也会同步在我的BiliBili账户发布，[https://www.bilibili.com/read/cv9888796](https://www.bilibili.com/read/cv9888796)