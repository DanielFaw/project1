
"use strict";
	class Walker{
		constructor(startX=320, startY=240, color="green", width=10, type="explosion", lifetime = 60){
			if(type == "explosion")
			{
				//Set the walker x/y to the startx/y; this will be for the explosion part
				this.x = startX;
				this.y = startY;
				this.color = color;
				this.maxLifetime = lifetime;
				this.currentLifetime = 0;
			}
			else
			{
				//If the type is a head, use the startx to show where the x would be, the start y
				//should be the bottom of the canvas, and then the targety is the point where
				//the walker 'explodes' into a firework!
				this.x = startX;
				this.y = canvasHeight;
				this.explodePoint = startY;
				this.color = "white";
				this.explosionVariant = color;
			}
			
			this.width = width;
			this.type = type;
			this.isAlive = true;
		}

		
		//If it leaves the screen, warp it to the other side
		boundaryCheck(){
			if (this.type == "head")
			{
				if (this.y <= this.explodePoint)
				{
					//Create more walker fireworks!
					this.isAlive = false;
					return 2;
				}
			}
			else
			{
				//Increase the lifetime counter and kill it by returning 3 if theyre equal
				this.currentLifetime++;
				if(this.currentLifetime >= this.maxLifetime)
				{
					this.isAlive = false;
					return 3;
				}
			}
			return 4;
		}

		//Moves the walker
		move()
		{
			if(this.type == "head")
			{
				//Flip the head, with a strong bias towards going up
				if(flipWeightedCoin(0.15))
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
					if(flipWeightedCoin(0.15))
					{
						this.y += this.width/2;
					}
					else
					{
						this.y -= this.width/2;
					}
				}
			}
			else
			//These are the walkers for the explosion of the firework
			{
				if(flipWeightedCoin())
				{
					this.x += this.width/2;
				}
				else
				{
					this.x -= this.width/2;
				}
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
	