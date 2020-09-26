
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
		let colorType = "random", explosionCircleColor = "white", explosionLineColor = "white";



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

			//Set the WalkerWorks color

			document.querySelector("#colorType").onchange = function(e){

				colorType = e.target.value;

			};

			document.querySelector("#explosionCircleColor").onchange = function(e){
				explosionCircleColor = e.target.value;
			}

			document.querySelector("#explosionLineColor").onchange = function(e){
				explosionLineColor = e.target.value;
			}



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
							walkerArray.push(new Walker(e.clientX, e.clientY, colorType, dfLIB.getRandomInt(5,20), headType));
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
			
			dfLIB.clearScreen(ctx);
			
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
				//populate the walker array with the walker fireworks!
				createExplosion(myWalker);
				myWalker.isAlive = false;
			}
		}
		
		
		function flipWeightedCoin(weight = 0.5){
			return Math.random() < weight;
		}

		function createExplosion(myWalker)
		{
			//This will be a bit ugly because I need to make a few different firework types
			
			let randSize = dfLIB.getRandomInt(15,25);
			let randTime = dfLIB.getRandomInt(30, 120);
			let explosionColor;
			for(let i = 0; i < 16; i++)
			{
				//Alternate colors that are being added
				if(i%2)
				{
					switch(myWalker.explosionVariant)
					{
						case("purple"):
						explosionColor = "purple";

						break;	
						case("green"):
						explosionColor = "green";

						break;
						case("orange"):
						explosionColor = "orange";

						break;
						case("random"):
						explosionColor = dfLIB.getRandomColor();

						break;
						default:
							console.log("whoops");
							break;
					}
				}
				else
				{
					switch(myWalker.explosionVariant)
					{
						case("purple"):
						explosionColor = "yellow";

						break;	
						case("green"):
						explosionColor = "pink";

						break;
						case("orange"):
						explosionColor = "blue";

						break;
						case("random"):
						explosionColor = dfLIB.getRandomColor();

						break;
						default:
							console.log("whoops");
							break;
					}
				}



				walkerArray.push(new Walker(myWalker.x, myWalker.y, explosionColor, randSize, expType, randTime));
			}

			//Create explosion effects at the point where the firework head died

			dfLIB.drawCircle(ctx, myWalker.x, myWalker.y, 30, explosionCircleColor);		

			for(let i = 0; i < Math.PI * 2; i += Math.PI / 9)
			{
				let xVariant = Math.sin(i) * 100;
				let yVariant = Math.cos(i) * 100;

				dfLIB.drawLine(ctx, myWalker.x - xVariant, myWalker.y - yVariant, myWalker.x + xVariant, myWalker.y + yVariant, 1, explosionLineColor);
			}

		}