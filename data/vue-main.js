const app = Vue.createApp ({
    data(){
        return {
            membersArray: [],
            parties: ["D", "R", "ID"],            
            states: "All",
            statistics: {
                democrats:[],
                republicans:[],
                independents:[],
                democratsN:0,
                republicansN:0,
                independentsN:0,
                total: 0,
                averageVotesDemo: 0,
                averageVotesRepu: 0,
                averageVotesInde: 0,
                averageVotesTotal: 0,
                averageVotesTotalS: 0,
                mostLoyals:[],
                leastLoyals:[],
                mostEngaged:[],
                leastEngaged:[]
            },
            sortedArray: []
        }
    },
    created() {
        /*chambers= document.title.includes('Senate') ? 'senate' : 'house',
        endpoint= `https://api.propublica.org/congress/v1/113/${chambers}/members.json`,
*/
        const senate = document.getElementById ("senate")
        let chambers = senate ? "senate" : "house"
       
        fetch (`https://api.propublica.org/congress/v1/113/${chambers}/members.json`, {
            headers: {
                "X-API-key": "71wMj8olnZ37pGOAzzp4DdIP8swr3HShHfItNlAu"
            }})
            .then (res => res.json())
            .then (json => {
                this.membersArray = json.results[0].members

                this.fillStatistics(json.results[0].members)
            })
    },
    methods: {
        totalPercent (party) {
            let outPercent = 0;
            party.forEach (member => {
                outPercent = outPercent + member.votes_with_party_pct;
            })
            outPercent /= party.length;
            return outPercent.toFixed(2);
        },
        arraySort (arreglo, propiedad, orden) {
        sortedArray = [...arreglo];
        if (orden == "descendentes") {
            sortedArray.sort ((a, b) => {
                if (a[propiedad] > b[propiedad]) {
                    return -1;
                } else if (a[propiedad] < b[propiedad]) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }
        if (orden == "ascendentes") {
            sortedArray.sort ((a, b) => {
                if (a[propiedad] < b[propiedad]) {
                    return -1;
                } else if (a[propiedad] > b[propiedad]) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }
        return sortedArray.slice (0, Math.ceil(sortedArray.length/10));;  
        },
        fillStatistics (array) {
            this.statistics.democrats = array.filter(member => member.party == "D")
            this.statistics.republicans = array.filter(member => member.party == "R")
            this.statistics.independents = array.filter(member => member.party == "ID")

            this.statistics.democratsN = array.filter(member => member.party == "D").length
            this.statistics.republicansN = array.filter(member => member.party == "R").length
            this.statistics.independentsN = array.filter(member => member.party == "ID").length
            this.statistics.total = this.statistics.democratsN + this.statistics.republicansN + this.statistics.independentsN

            this.statistics.averageVotesDemo = parseFloat(this.totalPercent(this.statistics.democrats))
            this.statistics.averageVotesRepu = parseFloat(this.totalPercent(this.statistics.republicans))
            this.statistics.averageVotesInde = parseFloat(this.totalPercent(this.statistics.independents))
            this.statistics.averageVotesTotal = parseFloat(this.statistics.averageVotesDemo + this.statistics.averageVotesRepu) / 2
            this.statistics.averageVotesTotalS = parseFloat(this.statistics.averageVotesDemo + this.statistics.averageVotesRepu + this.statistics.averageVotesInde) / 3

            this.statistics.mostLoyals = this.arraySort(array, "votes_with_party_pct", "descendentes")
            this.statistics.leastLoyals = this.arraySort(array, "votes_with_party_pct", "ascendentes")
    
            this.statistics.mostEngaged = this.arraySort(array, "missed_votes_pct", "ascendentes")
            this.statistics.leastEngaged = this.arraySort(array, "missed_votes_pct", "descendentes")
        }
    },
    computed: {
        filterPartyState() {
            let arrayFilter = [];
            arrayFilter = this.membersArray.filter (member => this.parties.includes (member.party) && member.state == this.states);
            if (this.states == "All") {
                arrayFilter = this.membersArray.filter (member => this.parties.includes (member.party))
            }
            return arrayFilter;
        }
    }
})

app.mount ("#app");