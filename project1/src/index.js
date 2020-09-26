
		'use strict';
		let ctx;
		let canvas;
		let canvasWidth=640, canvasHeight = 480;
		let walkerArray = [];
		const slowFps = 10, medFps = 30, fastFps = 60;
		let currentFps = medFps;
		let currentInt;
		let walkerCreateAmount = 1;
		let headType = "head", expType = "explosion";
		// #1 call the init function after the pages loads
		window.onload = function(){
			console.log("page loaded!");		
			canvas = document.querySelector('canvas');	
			ctx = canvas.getContext('2d');					
			ctx.fillStyle = 'black'; 
			
			//Get the speed change
			document.querySelector("#speedControl").onchange = function(e){

				if(e.target.value == "fast")
				{
					currentFps = fastFps;
				}
				else if (e.target.value == "normal")
				{
					currentFps = medFps;
				}
				else
				{
					currentFps = slowFps;
				}
				clearInterval(currentInt);
				currentInt = setInterval(loop, 1000/currentFps);
			};
			currentInt = setInterval(loop, 1000/currentFps);

			//Set the amount of walkers created per click
			document.querySelector("#createAmount").onchange = function(e){
				walkerCreateAmount = e.target.value;
			};


			/*
			//Create a couple walkers
			walkerArray[0] = new Walker(320, 240, "green", 10, expType);
			walkerArray[1] = new Walker(320, 240, "red", 15, expType);
			walkerArray[2] = new Walker(320, 240, "blue", 5, expType);
			walkerArray[3] = new Walker(320, 240, "yellow", 10, expType);
			*/

			window.onclick = function(e){
				//Create a walker of a random color at the point the user clicked
				if(walkerCreateAmount > 0)
				{
					//Make sure that the click is in bounds
					if(e.clientX > 0 && e.clientX < canvasWidth && e.clientY > 0 && e.clientY < canvasHeight)
					{
						for(let i = 0; i < walkerCreateAmount; i++)
						{
							//walkerArray.push(new Walker(e.clientX, e.clientY, getRandomColor(), dfLIB.getRandomInt(5,20), headType));
							walkerArray.push(new Walker(e.clientX, e.clientY, "purple", dfLIB.getRandomInt(5,20), headType));
						}
					}
				}
			}

			loop();
		}

		//Create the walkers to add to the array


		function loop()
		{
			//Reset the loop
			
			cls();
			
			if(walkerArray.length > 0)
			{
				for(let i = 0; i < walkerArray.length; i++)
				{
					drawWalker(walkerArray[i]);
				}
			}

			//This filters out any dead walkers
			
			walkerArray = walkerArray.filter(function (e) {
				return e.isAlive;
			});

			
		}


		
		function drawWalker(myWalker){
			ctx.save();
			ctx.fillStyle = myWalker.color;
			ctx.fillRect(myWalker.x-myWalker.width/2,myWalker.y-myWalker.width/2,myWalker.width/2,myWalker.width/2);
			ctx.restore();
			myWalker.move();
			let walkerScore = myWalker.boundaryCheck();
			if (walkerScore == 2)
			{
				//If the boundaryCheck returns 2 (the head reached it's goal), then populate the walker array with the walker fireworks!
				let randNum = dfLIB.getRandomInt(8,12);
				let randSize = dfLIB.getRandomInt(10,25);
				let randTime = dfLIB.getRandomInt(30, 120);
				for(let i = 0; i < randNum; i++)
				{
					walkerArray.push(new Walker(myWalker.x, myWalker.y, myWalker.explosionVariant, randSize, expType, randTime));
				}
				myWalker.isAlive = false;
			}
		}
		
		// UTILS
		function getRandomColor(){
			function getByte(){
				return 55 + Math.round(Math.random() * 200);
			}
			return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";
		}
		
		function cls(){
			ctx.save();
			ctx.globalAlpha = 0.03;
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,640,480);
			ctx.restore();
		}
		
		function flipWeightedCoin(weight = 0.5){
			return Math.random() < weight;
		}