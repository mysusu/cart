//TODO: Please write code in this file.
function printInventory(inputs) {
    var allItem   = loadAllItems();
    var promot    = loadPromotions()[0];
    var Itemcount = [];
    var promotCount= [];
    var goodsPrint = [];
    var freePrint = [];
    var totalMoney = 0;
    var cutMoney = 0;
    var dateDigitToString;

    for(var a=0;a<allItem.length;a++){
        for(var b=0;b<inputs.length;b++){
            if(allItem[a].barcode == inputs[b].substring(0,10)){

               if(!Itemcount.length){
                   var aItem = allItem[a];
                   if(inputs[b].length > 10){
                       aItem.count=Number(inputs[b].substring(11,inputs[b].length));
                   } else {
                       aItem.count = 1;
                   }
                   Itemcount.push(aItem);
               } else {
                    for(var c= 0, length=Itemcount.length;c<length;c++){
                        if (Itemcount[c].barcode == inputs[b].substring(0,10)){
                            if(inputs[b].length > 10){
                                Itemcount[c].count += Number(inputs[b].substring(11,inputs[b].length));
                            } else {
                                Itemcount[c].count++;
                            }
                            break;

                        }
                        if(Itemcount[c].barcode != inputs[b].substring(0,10) && c == Itemcount.length - 1){
                           var bItem=allItem[a];
                            if(inputs[b].length > 10){
                                bItem.count=Number(inputs[b].substring(11,inputs[b].length));
                            } else {
                                bItem.count = 1;
                            }
                            Itemcount.push(bItem);
                        }
                    }

                   }

               }
            }

        }

        for(var n = 0; n < Itemcount.length; n++){
            for(var k = 0; k < promot.barcodes.length;k++) {
                if(Itemcount[n].barcode == promot.barcodes[k] && Itemcount[n].count>=2){
                    Itemcount[n].subTotalm = (Itemcount[n].count - 1) * Itemcount[n].price;
                    var promotCounts= {name: Itemcount[n].name,price:Itemcount[n].price,unit:Itemcount[n].unit, count: 1};
                    promotCount.push(promotCounts);
                    break;
                }
                if(promot.barcodes[k] != Itemcount[n].barcode && k == promot.barcodes.length - 1){
                    Itemcount[n].subTotalm = Itemcount[n].count * Itemcount[n].price;
                }
            }
        }

         console.info(Itemcount)
    for(var i = 0; i < Itemcount.length; i++) {
        goodsPrint[i] = "名称：" + Itemcount[i].name + "，数量：" + Itemcount[i].count + Itemcount[i].unit + "，单价："
            + Itemcount[i].price.toFixed(2) + "(元)，小计：" + Itemcount[i].subTotalm.toFixed(2)
            + "(元)\n";
        totalMoney += Itemcount[i].subTotalm;
    }
    for(var j = 0;j <  promotCount.length;j++){
        freePrint[j]="名称：" + promotCount[j].name + "，数量：" + promotCount[j].count + promotCount[j].unit + "\n";
        cutMoney += promotCount[j].price;
    }
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


    var text =
        '***<没钱赚商店>购物清单***\n' +
        '打印时间：' + formattedDateString + '\n' +
        '----------------------\n' +
        goodsPrint.join("") +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        freePrint.join("") +
        '----------------------\n' +
        '总计：' + totalMoney.toFixed(2) + '(元)\n' +
        '节省：' + cutMoney.toFixed(2) + '(元)\n' +
        '**********************';
    console.log(text);

}