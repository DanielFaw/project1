
"use strict";
	class Walker{
		constructor(startX=320, startY=240, color="green", width=10){
			this.x = startX;
			this.y = startY;
			this.color = color;
			this.width = width;
		}

		
		//If it leaves the screen, warp it to the other side
		boundaryCheck(){
			if(this.x >= canvasWidth)
			{
				this.x = 0;
			}
			else if (this.x <= 0)
			{
				this.x = canvasWidth;
			}

			if(this.y >= canvasHeight)
			{
				this.y = 0;
			}
			else if (this.y <= 0)
			{
				this.y = canvasHeight;
			}
		}

		//Moves the walker
		move()
		{
			if(flipWeightedCoin())
			{
				if(flipWeightedCoin())
				{
					this.x += this.width/2;
				}
				else
				{
					this.x -= this.width/2;
				}
			}
			else
			{
				if(flipWeightedCoin())
				{
					this.y += this.width/2;
				}
				else
				{
					this.y -= this.width/2;
				}
			}
		}

	}
	