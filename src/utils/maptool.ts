// test

class MapTool {
    private httputil = require('./http');
    private mapUrl: string = 'http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil';
    private fs = require('fs');
    private path = require('path');
    private util = require('util');
    private filetool = require('./file');

    public async GetMapData(x: number, y: number, zoom: number) {
        const url = this.mapUrl.replace('{x}', x.toString())
            .replace('{y}', y.toString())
            .replace('{z}', zoom.toString());
        console.log(`pic url: ${url}`);

        const filename = this.path.resolve(__dirname +
            `/../../maptool/mapdata/${zoom}/${x}/${y}.png`);
        // 检查当前目录中是否存在该文件。
        const statpromise = this.util.promisify(this.fs.stat);

        const stats = await statpromise(filename).catch(async () => {
            await this.httputil.GetImage(url, filename).catch(async () => {
                await this.filetool.Delete(filename);
            });
        });
        if (stats) {
            if (stats.size === 0) {
                console.error('文件错误,重新下载');
                await this.GetMapData(x, y, zoom);
            }
            console.log('exist');
        }

        const raedpromise = this.util.promisify(this.fs.readFile);
        const image = await raedpromise(filename).catch((error) => {
            console.error(error);
        });
        return image;
    }
}

module.exports = new MapTool();
