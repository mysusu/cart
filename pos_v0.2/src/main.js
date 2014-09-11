//TODO: Please write code in this file.
function printInventory(inputs) {
    var allItem = loadAllItems();
    var promot = loadPromotions();
    var Itemcount=[];
    for(var a=0;a<allItem.length;a++){
        for(var b=0;inputs.length;b++){
            if(allItem[a].barcode == inputs[b].substring(0,10)){
                var aItem = allItem[a];
                aItem.count=1;
               if(Itemcount.length){
                    aItem.count = 1;
               } else {
                   aItem.count++;

               }
            }

        }

    }
}