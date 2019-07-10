
class Http {
    private request = require('request');
    private util = require('util');
    private fs = require('fs');
    private path = require('path');
    private filetool = require('./file');

    public async Get(url: string, headers: any) {
        const options = {
            url, // 请求路径
            method: 'GET', // 请求方式，默认为get
            headers,
        };
        return await this.HttpRequest(options);
    }

    public async GetImage(url: string, filename: string) {
        const dirname = this.path.dirname(filename);
        this.makeDir(dirname);
        const headers = {
            // 'Accept-Encoding': 'gzip, deflate',
            // 'Accept-Language': 'zh-CN,zh;q=0.9',
            // 'Cache-Control': 'no-cache',
            // 'Host': 'mt2.google.cn',
            // 'Pragma': 'no-cache',
            // 'Proxy-Connection': 'keep-alive',
            // 'Upgrade-Insecure-Requests': '1',
            // tslint:disable-next-line: max-line-length
            'Content-Type': 'image/png;',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        };
        const options = {
            url, // 请求路径
            method: 'GET', // 请求方式，默认为get
            headers,
        };
        await new Promise((resolve, reject) => {
            // const chunks = [];
            // let size: number = 0;
            // let bufferdata = null;
            const req = this.request(options, (error, res, body) => {
                if (error || res.statusCode !== 200) {
                    console.log('图片下载失败');
                    if (error) {
                        console.error(error);
                    }
                    if (res) {
                        console.error(`res.statusCode:${res.statusCode}`);
                    }
                    reject();
                } else {
                    // resolve();
                }
            }).pipe(this.fs.createWriteStream(filename));
            req.on('finish', () => {
                resolve();
            });

            // req.on('data', (data) => {
            //     chunks.push(data);
            //     size += data.length;
            //     //console.log(data);
            // });
            // req.on('end', () => {
            //     if (chunks.length > 0) {
            //         bufferdata = new Buffer(size);
            //         chunks.forEach((chunk) => {
            //             chunk.copy(bufferdata, 0);
            //         });

            //         this.filetool.WriteFile(filename, bufferdata);
            //     }
            //     //console.log(data);
            // });
        });
    }

    private async HttpRequest(options) {
        const getPromise = this.util.promisify(this.request);
        console.log('http config:' + JSON.stringify(options));
        const { body } = await getPromise(options).catch((error) => {
            console.info('http request error');
            console.error(error);
        });
        return body;

    }

    private makeDir(dirpath) {
        if (!this.fs.existsSync(dirpath)) {
            let pathtmp;
            dirpath.replace(/\\/g, '/').split('/').forEach((dirname) => {
                if (pathtmp) {
                    pathtmp = this.path.join(pathtmp, dirname);
                } else {
                    // 如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
                    if (dirname) {
                        pathtmp = dirname;
                    } else {
                        pathtmp = '/';
                    }
                }
                if (!this.fs.existsSync(pathtmp)) {
                    if (!this.fs.mkdirSync(pathtmp)) {
                        return false;
                    }
                }
            });
        }
        return true;
    }

}

module.exports = new Http();
