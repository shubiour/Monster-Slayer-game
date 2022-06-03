function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages : []
        };
    },
    computed: {
        monsterBarStyles() {
            if(this.monsterHealth < 0 ){
                return {width: '0%'};
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            if(this.playerHealth < 0 ){
                return {width: '0%'};
            }
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },

    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                //draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                //draw
                this.winner = 'draw';
                this.end = true;
            } else if (value <= 0) {
                //monster lost
                this.winner = 'player';
            }
        },
    },
    methods: {
        attackMonster() {
            this.currentRound++
            this.monsterHealth = this.monsterHealth - getRandom(5, 12);
            this.addLogMessage('player','attack',getRandom(5, 12));
            this.attackPlayer();
        },
        attackPlayer() {
            this.playerHealth = this.playerHealth - getRandom(8, 15);
            this.addLogMessage('monster','attack',getRandom(5, 12));
        },
        specialAttack() {
            this.currentRound++;
            this.monsterHealth = this.monsterHealth - getRandom(15, 20);
            this.addLogMessage('player','Ulti',getRandom(5, 12));
            this.attackPlayer();

        },
        healPlayer() {
            this.currentRound++;
            if (this.playerHealth + getRandom(8, 20) > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth = this.playerHealth + getRandom(8, 20);
            }
            this.addLogMessage('player','heal',getRandom(5, 12));
            this.attackPlayer();
        },
        restartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(who, what, value){
             this.logMessages.unshift({
                 actionBy: who,
                 actionType : what,
                 actionValue : value,
             });
        }

    },


});

app.mount("#game");