---
title: Ubuntu-Linux服务器初始化(其实就是个备忘录)
tags:
  - BBR
  - Let&#039;s Encrypt
  - Linux
  - LNMP
  - MySQL
  - Trojan
  - Ubuntu
  - 初始化
id: '173'
categories:
  - - 伪*Server运维
date: 2021-03-13 10:00:00
---

```bash
#先开个SWAP
cd /var
sudo dd if=/dev/zero of=swapfile bs=1024 count=2000000
sudo mkswap swapfile
sudo swapon /var/swapfile
echo /var/swapfile   swap  swap  defaults  0  0 >> /etc/fstab
cd ~
#更新和安装wget，curl
sudo apt update
sudo apt upgrade
sudo apt install curl wget -y
#echo y  sudo apt upgrade (不建议)
#配置/安装MySQL8
wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb
dpkg -i mysql-apt-config_0.8.16-1_all.deb
#安装选all
#去https://dev.mysql.com/downloads/repo/apt/检查有没有更新
sudo apt update
sudo apt install mysql
#安装lnmp套
wget http://soft.vpser.net/lnmp/lnmp1.8beta.tar.gz -cO lnmp1.8beta.tar.gz && tar zxf lnmp1.8beta.tar.gz && cd lnmp1.8 && ./install.sh lnmp
#不要安装MySQL
#Let's Encrypt SSL证书申请-acme.sh客户端
wget -O -  https://get.acme.sh  sh -s email=你的邮箱地址
#这里我们使用DNS API模式，各DNS解析商的初始化方法参见下方链接
#https://github.com/acmesh-official/acme.sh/wiki/dnsapi
#这里我是cloudflare，我们要让acme.sh先知道我们的api令牌和各种信息
export CF_Key="我的CloudFlare API令牌"
export CF_Email="我的CloudFlare账户邮箱"
~/.acme.sh/acme.sh --issue --dns dns_cf -d 待申请SSL的域名
#申请过后执行 crontab -e 检查是否加了自动续签
#正常来说会有类似下面这行东西
#33 0 * * * "/root/.acme.sh"/acme.sh --cron --home "/root/.acme.sh" > /dev/null
#Let's Encrypt SSL证书申请-Certbot客户端(已弃用)
#sudo snap install core
#sudo snap refresh core
#sudo snap install --classic certbot
#sudo ln -s /snap/bin/certbot /usr/bin/certbot
#./certbot-auto certonly -d *.域名 域名 --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
##执行命令：dig -t txt _acme-challenge.域名查询TXT记录是否生效
#配置renew
#sudo apt install python3.9
#wget https://bootstrap.pypa.io/get-pip.py
#pip install certbot-nginx
#sudo python3.9 ./get-pip.py
#cd /etc/letsencrypt/renewal
#ls
#vim '你的域名的配置文件'
#修改
#authenticator = nginx                                              #installer = #nginx                                                                   
#ln -s /usr/local/nginx/conf/ /etc/nginx
#echo 1  certbot --force-renew
#定义自动任务
#crontab -e
#添加：30 2 * * 1 sudo certbot --force-renew
#上面的执行时间为：每周一半夜2点30分执行renew任务。
#以下为配置Trojan，国内服务器就免了
sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/trojan-gfw/trojan-quickstart/master/trojan-quickstart.sh)"
sudo cp /usr/local/etc/trojan/config.json /usr/local/etc/trojan/config.json.bak
sudo vim /usr/local/etc/trojan/config.json
#配置密码，证书等
sudo systemctl restart trojan
#查看状态：sudo systemctl status trojan
sudo systemctl enable trojan  #开机自启动，

#开启BBR
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
#保存生效
sysctl -p
#reboot
#测试：
sysctl net.ipv4.tcp_available_congestion_control
#如果结果中有 BBR，则内核开启 BBR 算法成功
lsmod  grep bbr
#看到 tcp_bbr 则说明 BBR 启动成功
```

## 性能测试(大雾)：

```bash
#跑分（UnixBench）
wget https://s3.amazonaws.com/cloudbench/software/UnixBench5.1.3.tgz
tar -xf UnixBench5.1.3.tgz
cd UnixBench/
make all
./Run
#Speedtest测速
wget -qO- bench.sh  bash
#流媒体检测
bash <(curl -sSL "https://github.com/CoiaPrant/MediaUnlock_Test/raw/main/check.sh")
#测回程脚本（二选一）
wget -q kos.f2k.pub -O kos && sh kos
wget -qO- git.io/besttrace  bash
#三网测速脚本
bash <(curl -Lso- https://git.io/superspeed)#LemonBench
curl -fsSL https://ilemonrain.com/download/shell/LemonBench.sh  bash -s fast  #快速
curl -fsSL https://ilemonrain.com/download/shell/LemonBench.sh  bash -s full  #完整
```