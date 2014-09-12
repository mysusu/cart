function Item(barcode, name, unit, price) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
}
//TODO: Please write code in this file.

var dateDigitToString;
dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
};
var currentDate = new Date(),
    year = dateDigitToString(currentDate.getFullYear()),
    month = dateDigitToString(currentDate.getMonth() + 1),
    date = dateDigitToString(currentDate.getDate()),
    hour = dateDigitToString(currentDate.getHours()),
    minute = dateDigitToString(currentDate.getMinutes()),
    second = dateDigitToString(currentDate.getSeconds()),
    formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;


function printInventory(inputs) {

    var allItems   = loadAllItems();
    var promotions = loadPromotions();

    var BARCODE_LENGTH = 10;
    var cartCountInfo = [];

    for (var i = 0, itemCount = allItems.length; i< itemCount; i++) {//遍历所有产品
        for (var j = 0, inputCount = inputs.length; j < inputCount; j++) {//遍历输入的产品
            if (allItems[i].barcode == inputs[j].substring(0, BARCODE_LENGTH)) {
                if (!cartCountInfo.length) {//if null是否统计过
                    var initItem = allItems[i];
                    if(inputs[j].length>BARCODE_LENGTH) {
                        initItem.count = Number(inputs[j].substring(11, inputs[j].length));//添加个数，从11往后取

                    } else {//没有输入过
                        initItem.count = 1;
                    }
                    cartCountInfo.push(initItem);//购买的东西已经村过了
                } else {//if not null
                    for(var k = 0, cartCountInfoLength = cartCountInfo.length; k < cartCountInfoLength; k++) {//查一下是否存在
                        if (cartCountInfo[k].barcode == inputs[j].substring(0, BARCODE_LENGTH)) {

                            if(inputs[j].length>BARCODE_LENGTH){
                                cartCountInfo[k].count += Number(inputs[j].substring(11, inputs[j].length));
                            } else {
                                cartCountInfo[k].count++;
                                break;//
                            }
                            if (cartCountInfo[k].barcode != inputs[j].substring(0, BARCODE_LENGTH) && k == cartCountInfoLength - 1) {//遍历完数组后才能看是否存在是否统计过该商品
                                //k=...-1 遍历到最后一个
                                var item = allItems[i];

                                if(inputs[j].length > BARCODE_LENGTH) {
                                    item.count = Number(inputs[j].substring(11, inputs[j].length));
                                } else {
                                    item.count = 1;
                                }
                                cartCountInfo.push(item);

                            }         }
                    }
                }
            }
        }
    }
    var presentations = [];

    for(var m = 0, promotionsLength = promotions.length; m < promotionsLength; m++) {//促销的那一种策略// 商品
        for(var l = 0; l < cartCountInfo.length; l++) {//cart中是否在促销范围内
            for(var n = 0, barcodesLength = promotions[m].barcodes.length; n < barcodesLength; n++) {//遍历每种促销产品
                if (cartCountInfo[l].barcode == promotions[m].barcodes[n] && cartCountInfo[l].count>=2) {
                    cartCountInfo[l].totalPrice = (cartCountInfo[l].count - 1) * cartCountInfo[l].price;
                    var presentation = {name: cartCountInfo[l].name, count: 1,price:cartCountInfo[l].price,unit:cartCountInfo[l].unit};
                    presentations.push(presentation);
                    break;//统计商品是唯一的，找到后就跳到下一种产品
                }
                if (promotions[m].barcodes[n] != cartCountInfo[l].barcode && n == barcodesLength - 1) {//到最后一个才能判断是否打过折
                    cartCountInfo[l].totalPrice = cartCountInfo[l].count * cartCountInfo[l].price;
                }
            }
        }
    }
    var printTexts = [];//
    var freeTexts = [];//h会类赠送
    var resultPrice = 0;//总价
    var freeTotalPrice = 0;//节省

    for(var o = 0; o < cartCountInfo.length; o++) {
        printTexts[o] = "名称：" + cartCountInfo[o].name + "，数量：" + cartCountInfo[o].count + cartCountInfo[o].unit +"，单价："
            + (cartCountInfo[o].price).toFixed(2) + "(元)，小计：" + cartCountInfo[o].totalPrice.toFixed(2)
            + "(元)\n";//toFixed(2)小数
        resultPrice += cartCountInfo[o].totalPrice;
    }

    for(var p = 0; p < presentations.length; p++) {
        freeTexts[p] = "名称：" + presentations[p].name + "，数量：" + presentations[p].count + presentations[p].unit + "\n";
        freeTotalPrice += presentations[p].price
    }
    var resultText =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' +
        printTexts.join("") +//拼成字符串
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        freeTexts.join("") +
        '----------------------\n' +
        '总计：' + resultPrice.toFixed(2) + '(元)\n' +
        '节省：' + freeTotalPrice.toFixed(2) + '(元)\n' +
        '**********************';
    console.log(resultText);
}
