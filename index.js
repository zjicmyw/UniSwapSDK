
var express = require('express');//引用express
var app = express();//创建express实例
const { ChainId, Token, WETH, Fetcher, Route } = require('@uniswap/sdk')
const DBL = new Token(ChainId.MAINNET, '0x3800544c0ad45e2222d67151ff08ee0c476f6221', 8)

const getDBLPice=  async(res) =>{
    const pair = await Fetcher.fetchPairData(DBL, WETH[DBL.chainId])
    const route = new Route([pair], WETH[DBL.chainId])
    let price = route.midPrice.invert().toSignificant(6)
    console.log(price) 
    return res.json(price);

}



app.get('/', function (req, res) {//当路由url匹配为'/'时，执行function，返回Hello World
    let price = getDBLPice(res)
    console.log(price)
});

var server = app.listen(8094, function () {//应用启动端口为8081

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});