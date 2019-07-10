
class FileTool {
    private util = require('util');
    private fs = require('fs');
    public WriteFile(path: string, buffer: any) {
        // 文件不存储会创建 如果存在会先清空文件类容，再将文件写入
        // 第一个参数，写入路径
        // 第二个最高水位线 默认16K
        // 默认是utf8格式写入
        const ws = this.fs.createWriteStream(path);
        // write是异步方法，有返回值，每次调用write方法会返回布尔值
        // write里面只能是字符串或buffer
        const flag = ws.write(buffer);
        // 监控内存里面全部写完了，恢复读取，才会调用此方法
        ws.on('drain', () => {
            console.log('内存干了');
        });
        ws.end(); // 结束，如果调用end,会强制将内存中的内容全部写入，然后关闭文件

        // 返回值是true表示能继续写入，如果为false就不要继续写入
        // res.write() res是一个可写流
        // 假如文件大小1G大，每次读取64K,每次写16K,写不完的剩下的放内存，已经写不下时候，先暂停不要读取了
        // 等我把内存空间的写完成了，和当前写流中的内容全部写入后，再继续读取
    }

    public async Delete(path: string) {
        const ullinkpromise = this.util.promisify(this.fs.unlink);
        await ullinkpromise(path).catch((error) => {
            console.error('删除文件失败');
            console.error(error);
        });
        console.log('删除文件成功：' + path);
    }

    // public async WriteFile(path: string, buffer: any) {
    //     const writepromise = this.util.promisify(this.fs.writeFile);
    //     await writepromise(path, buffer);
    // }
}

module.exports = new FileTool();
