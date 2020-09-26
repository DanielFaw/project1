"use strict";

(function(){

let dfLIB = {

getRandomColor(){
    const getByte = _ => 55 + Math.round(Math.random() * 200);
    //return `rgba(${getByte()}, ${getByte()}, ${getByte()}, ${Math.random()}`;
    return `rgba(${getByte()}, ${getByte()}, ${getByte()}, 1`;

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
    ctx.fillStyle = this.randomColorCheck(fillStyle);
    
    ctx.fill();
    if(lineWidth > 0)
    {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = this.randomColorCheck(fillStyle);
        ctx.stroke();
    }
    
    ctx.restore();
},

drawLine(ctx,startX,startY,endX,endY,lineWidth=5,strokeStyle="black"){

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = this.randomColorCheck(strokeStyle);
    ctx.stroke();
    ctx.restore();
},

drawCircle(ctx,x,y,radius,fillStyle="black",lineWidth=0,strokeStyle="black"){

    ctx.save();
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2);
    ctx.fillStyle = this.randomColorCheck(fillStyle);
    
    ctx.fill();
    if(lineWidth > 0)
    {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = this.randomColorCheck(strokeStyle);
        ctx.stroke();
    }
    
    ctx.restore();
},





clearScreen(ctx)
{   
    ctx.save();
	ctx.globalAlpha = 0.03;
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
	ctx.restore();
},

setStyles(ctx)
{
    setTimeout(function(){dfLIB.setStyles(ctx)}, dfLIB.getRandomInt(300,1500));
    ctx.fillStyle = dfLIB.getRandomColor();
    ctx.strokeStyle = dfLIB.getRandomColor();
    ctx.lineWidth = dfLIB.getRandomInt(1,10);
},

randomColorCheck(color)
{
    if(color == "random")
    {
        return this.getRandomColor();
    }
    else
    {
        return color;
    }
}






    };

if (window)
{
    window["dfLIB"] = dfLIB;
} else {
    throw "'window' is not defined!";
}

})();
  