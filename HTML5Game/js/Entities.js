        var Img = {};
        Img.bullet = new Image();
        Img.bullet.src = 'images/bullet2.png';
        Img.eBullet = new Image();
        Img.eBullet.src = 'images/evilBullet2.png';
        Img.hero = new Image();
        Img.hero.src = 'images/hero2.png';
        Img.enemy = new Image();
        Img.enemy.src = 'images/enemy2.png';
        Img.coin = new Image();
        Img.coin.src = 'images/coin2.png';
        Img.sword = new Image();
        Img.sword.src = 'images/sword2.png';
        var immunity = 0;
        Entity = function(type, id, x, spdX, y, spdY, width, height, img) {
            var self = {
                type:type,
                id:id,
                x:x,
                spdX:spdX,
                y:y,
                spdY:spdY,
                width:width,
                height:height,
                img:img,
            };
            self.update = function() {
                self.updatePosition();
                self.draw();
            }
            self.updatePosition = function() {
                self.x += self.spdX;
                self.y += self.spdY;
                if (self.x > WIDTH || self.x < 0) {
                    self.spdX = -self.spdX;
                }
                if (self.y > HEIGHT || self.y < 0) {
                    self.spdY = -self.spdY;
                }
            }
            self.draw = function() {
                ctx.save();
                var x = self.x-self.width/2;
                var y = self.y-self.height/2;
                ctx.drawImage(self.img,x,y);
                ctx.restore();
            }
            self.getDistanceBetweenEntity = function(entity2) { //returns distance between two objects (number)
                var vx = self.x - entity2.x;
                var vy = self.y - entity2.y;
                return Math.sqrt(vx**2+vy**2);
            }
            self.testCollisionEntity = function(entity2) { //return if entities collide (true/false)
                var rect1 = {
                    x:self.x-self.width/2,
                    y:self.y-self.height/2,
                    width:self.width,
                    height:self.height,
                }
                var rect2 = {
                    x:entity2.x-entity2.width/2,
                    y:entity2.y-entity2.height/2,
                    width:entity2.width,
                    height:entity2.height,
                }
                return testCollisionsRect(rect1, rect2);
            }
            return self;

        }
        actor = function(type, id, x, spdX, y, spdY, width, height, img, hp, atkSpd) {
            var self = Entity(type, id, x, spdX, y, spdY, width, height, img);
            self.hp = hp;
            self.atkSpd = atkSpd;
            self.atkCounter = 0;
            self.aimAngle = 0;
            self.performAttack = function() {
                if (self.atkCounter > 25) {
                    self.atkCounter = 0;
                    randomlyGenerateBullet(self, self.aimAngle);
                }
            }
            self.superShoot = function() {
                if (self.superCounter> 100) {
                    for (var i = 0; i < 3; i+=1){
                        randomlyGenerateBullet(self, self.aimAngle+15*i);
                    }
                    self.superCounter= 0;
                }
            }
            var super_update = self.update;
            self.update = function() {
                super_update();
                self.atkCounter +=self.atkSpd
            }
            return self
        }
        //Player
        var player;
        createPlayer = function() {
            var self = actor('player','I',50,50,50,50,100,114, Img.hero, 10, 1);
            self.superCounter=0;
            self.up=false;
            self.right=false;
            self.down=false;
            self.left=false;
            player = self;
            self.updatePosition = function() {
                if (self.up && self.y > 0+self.height/2) {
                    self.y -= 10;
                }
                if (self.right && self.x < WIDTH-self.width/2) {
                    self.x += 10;
                } 
                if (self.down && self.y < HEIGHT-self.height/2) {
                    self.y += 10;
                }
                if (self.left && self.x > 0 + self.width/2) {
                    self.x -= 10;
                }
            }
            var super_update = self.update;
            self.update = function() {
                super_update();
                self.superCounter+=self.atkSpd;
                if (self.hp<= 0) {
                        timeSurvived = Date.now() - timeStart;
                        console.log("You lost. You survived for " + timeSurvived + " ms.");
                        ctx.fillText("You lost. You survived for " + timeSurvived + " ms", WIDTH/4, HEIGHT/4);
                        ctx.fillText("Press 'ESC' to start again", WIDTH/4, HEIGHT/3)
                        NewGame();
                        playing = false;
                        pause = Date.now();
                }
            }
        }
        //Enemy
        enemy = function(id,x,spdX,y,spdY) {
            //Math.floor(player.atkSpd/2)+1
            var self = actor('enemy',id,x,spdX,y,spdY,100, 95, Img.enemy, Math.ceil(Math.sqrt(player.atkSpd)), 1);
            self.superCounter = 0;
            enemyList[id] = self;
            var super_update = self.update;
            self.update = function() {
                super_update();
                self.aimAngle = Math.atan2(player.y-self.y,player.x-self.x) / Math.PI * 180;
                self.performAttack();
                if ((player.testCollisionEntity(self)) && immunity <= 0) {
                    player.hp = player.hp - 1;
                    immunity = 13;
                }
                if (self.hp <= 0) {
                    //console.log('test');
                    delete enemyList[self.id];
                }
            }
        }
        randomlyGenerateEnemy = function() {
            //console.log(enemySpawnTimers)
            //Math.random() generates a number between 0 and 1
            var x = Math.random() * WIDTH;
            var y = Math.random() * HEIGHT;
            var vx = x - player.x;
            var vy = y - player.y;
            var ss = Math.sqrt(vx**2+vy**2);
            while (ss < 80) {
                x = Math.random() * WIDTH;
                y = Math.random() * WIDTH;
                vx = x - player.x;
                vy = y - player.y;
                ss = Math.sqrt(vx**2+vy**2);
            }
            var id = Math.random()*1;
            var spdX = 10+ Math.random() * 15;
            var spdY = 10+ Math.random() * 15;
            enemy(id,x,spdX,y,spdY);
        }
        upgrade = function(id, x, spdX, y, spdY, category,) {
            if (category === 'low') {
                img = Img.coin;
            }
            if (category === 'atkSpd') {
                img = Img.sword;
            }
            var self = Entity('upgrade',id,x,spdX,y,spdY, 40,42, img);
            self.category = category;
            upgradeList[self.id] = self;
            var super_update = self.update;
            self.update = function() {
                super_update();
                if (player.testCollisionEntity(self)) {
                    if (self.category === 'low') {
                        score += 500;
                    }
                    if (self.category === 'atkSpd') {
                        player.atkSpd++;
                    }
                    delete upgradeList[self.id];
                }
            }
        }
        randomlyGenerateUpgrade = function() {
            var x = Math.random()*WIDTH;
            var y = Math.random()*HEIGHT;
            var id = Math.random();
            var spdX = 0;
            var spdY = 0;
            if (Math.random() < 0.5) {
                category = 'atkSpd';
            }
            else {
                category = 'low';
            }
            upgrade(id,x,spdX,y,spdY, category);
        }
        bullet = function(id, x, spdX, y, spdY, shooter) {
            var img;
            if (shooter === 'player') {
                img = Img.bullet;
            }
            else {
                img = Img.eBullet;
            }
            var self = Entity('bullet',id,x,spdX,y,spdY,40,40, img);
            self.shooter=shooter;
            self.timer=0;
            bulletList[id] = self;
            var super_update = self.update;
            self.update = function() {
                super_update();
                self.timer++;
                var toRemove = false;
                if (self.timer > 75) {
                    toRemove = true;
                }
                if (self.shooter === 'player') {
                    for (var key2 in enemyList) {
                        if (self.testCollisionEntity(enemyList[key2])) {
                            delete bulletList[self.id];
                            enemyList[key2].hp--;
                            //console.log('hit');
                            //console.log(enemyList[key2].hp--);
                            break;
                        }
                    }
                }
                else {
                    if (self.testCollisionEntity(player)) {
                        delete bulletList[self.id];
                        player.hp--;
                    }
                }
                if (toRemove) {
                    delete bulletList[self.id];
                }
            }
        }
        randomlyGenerateBullet = function(actor, overwriteAngle) {
            var x = actor.x;
            var y = actor.y;
            var angle = actor.aimAngle;
            if (overwriteAngle !== undefined) {
                angle = overwriteAngle;
            }
            var spdX = Math.cos(angle/180*Math.PI) * 15;
            var spdY = Math.sin(angle/180*Math.PI) * 15;
            var id = Math.random();
            var width = 10;
            var height = 10;
            bullet(id, x, spdX, y, spdY, actor.type);
        }
        testCollisionsRect = function (rect1, rect2) {
            return rect1.x <= rect2.x+rect2.width 
            && rect2.x <= rect1.x+rect1.width
            && rect1.y <= rect2.y + rect2.height
            && rect2.y <= rect1.y + rect1.height;
        }