"use strict";

(function(){

let dfLIB = {

getRandomColor(){
    const getByte = _ => 55 + Math.round(Math.random() * 200);
    return `rgba(${getByte()}, ${getByte()}, ${getByte()}, ${Math.random()}`;

  },

getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },


getRandomRect(ctx, canvasWidth, canvasHeight, drawParams){
    ctx.save();
    ctx.beginPath();
    ctx.rect(dfLIB.getRandomInt(0,canvasWidth), dfLIB.getRandomInt(0,canvasHeight), dfLIB.getRandomInt(drawParams.minRectSpan,drawParams.maxRectSpan), dfLIB.getRandomInt(drawParams.minRectSpan,drawParams.maxRectSpan));
    //ctx.fillStyle = getRandomColor();
    //ctx.strokeStyle = getRandomColor();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
},

getRandomCircle(ctx, canvasWidth, canvasHeight, drawParams){
    ctx.save();
    ctx.beginPath();
    ctx.arc(dfLIB.getRandomInt(0,canvasWidth), dfLIB.getRandomInt(0,canvasHeight), dfLIB.getRandomInt(20,70), 0, Math.PI * 2, false)
    //ctx.fillStyle = getRandomColor();
    //ctx.strokeStyle = getRandomColor();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
},

getRandomLine(ctx, canvasWidth, canvasHeight, drawParams){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(dfLIB.getRandomInt(0,canvasWidth), dfLIB.getRandomInt(0,canvasHeight));
    ctx.lineTo(dfLIB.getRandomInt(0,canvasWidth), dfLIB.getRandomInt(0,canvasHeight));
    ctx.closePath();
    //ctx.strokeStyle = getRandomColor();
    ctx.stroke();
    ctx.restore();
},

drawRectangle(ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black"){

    ctx.save();
    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.fillStyle = fillStyle;
    
    ctx.fill();
    if(lineWidth > 0)
    {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    
    ctx.restore();
},
clearScreen(ctx)
{
    setTimeout(function(){dfLIB.clearScreen(ctx)}, dfLIB.getRandomInt(5000,10000));
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
},

setStyles(ctx)
{
    setTimeout(function(){dfLIB.setStyles(ctx)}, dfLIB.getRandomInt(300,1500));
    ctx.fillStyle = dfLIB.getRandomColor();
    ctx.strokeStyle = dfLIB.getRandomColor();
    ctx.lineWidth = dfLIB.getRandomInt(1,10);
}






    };

if (window)
{
    window["dfLIB"] = dfLIB;
} else {
    throw "'windiw' is not defined!";
}

})();
  