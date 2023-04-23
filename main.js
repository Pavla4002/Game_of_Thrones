const App = {
    data(){
        return {
            info: [],
            firstName: '',
            lastName: '',
            fullName: '',
            family: '',
            title: '',
            imageUrl: '',
            id: '',
            arrFamily:['Stark', 'Baratheon', 'Tyrell'],
            sortOption: [
                {value: 'firstName', name: 'По имени - возрастание'},
                {value: 'firstName2', name: 'По имени - убывание'},
                {value: 'lastName', name: 'По фамилии- возрастание'},
                {value: 'lastName2', name: 'По фамилии - убывание'},
            ],
            selectOption: '',
            searchValue: '',
            familyOption:'',

            //Пользовательские штучки
            passwordUser:'',
            loginUser:'',
            ageUser:'',
            interesUser:[],

            //Окна авторизации и регистрации
            openReg: false,
            openAuto: false,

            //Зарегестрированный пользователь
            statusUser:false
        }
    },
    methods :{
        addPersona(){
            if(this.info.length===0){
                this.id = 0
            }else{
                this.id = this.info[this.info.length-1].id+1;
            }
            this.info.push(
                {
                    id:this.id,
                    firstName:this.firstName,
                    lastName:this.lastName,
                    fullName: this.fullName,
                    family:this.family,
                    title:this.title,
                    imageUrl:this.imageUrl
                }
            )
            this.firstName = '';
            this.lastName = '';
            this.fullName = '';
            this.family = '';
            this.title = '';
            this.imageUrl= '';
        },
        async infoPersonage (){
            const response = await fetch('https://thronesapi.com/api/v2/Characters');
            this.info = await response.json();
        },
        deletePersona(inf){
            this.info = this.info.filter(el => el.id!==inf.id);
        },
        openDialogAuto() {
            this.openAuto = true;
        },
//Авторизация
        auto() {
            this.statusUser = false //Если после авторизации авторизуются второй раз(не знаю зачем)
            let userAuto;
            for (let i=0; i<localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage[key];
                let user = JSON.parse(value);
                if (user.loginUser===this.loginUser && user.passwordUser===this.passwordUser) {
                    userAuto=user;
                    alert("Найден пользователь");
                    break;
                }
            }

            if (!userAuto) {
                alert("не найден пользователь");
            }else{
                this.statusUser = true
            }
            this.openAuto = false; // закрываем окно авторизации
            this.passwordUser='';
            this.loginUser='';
        },
        openDialogReg() {
            this.openReg = true;
        },

        //Регистрация ( уже в форме, диалоге)
        registration(){
            let key = Date.now(); // создание ключа

            const userInfo = {
                passwordUser: this.passwordUser,
                loginUser: this.loginUser,
                ageUser: this.ageUser,
                interesUser: this. interesUser,
            }

            localStorage.setItem(key.toString(), JSON.stringify(userInfo));
            this.openReg = false;
            this. passwordUser ='';
            this.loginUser ='';
            this.ageUser='';
            this. interesUser=[];
        }
    },
    mounted() {
        this.infoPersonage();
    },
    computed:{
        sortedPost() {
            switch (this.selectOption){
                case 'firstName':
                    return [...this.info].sort((post1, post2)=>post1['firstName']?.localeCompare(post2['firstName']));
                    break;
                case 'firstName2':
                    return [...this.info].sort((post1, post2)=> -1 * post1['firstName']?.localeCompare(post2['firstName']));
                    break;
                case 'lastName':
                    return [...this.info].sort((post1, post2)=>post1['lastName']?.localeCompare(post2['lastName']));
                    break;
                case 'lastName2':
                    return [...this.info].sort((post1, post2)=> -1 * post1['lastName']?.localeCompare(post2['lastName']));
                    break;
                default:
                    return [...this.info].sort((post1, post2)=>post1[this.selectOption]?.localeCompare(post2[this.selectOption]));
                    break;
            }
        },
        sortedAndSearchPost() {
            return this.sortedPost.filter(post=>(post.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) || post.lastName.toLowerCase().includes(this.searchValue.toLowerCase())));
        },
        filterPersonage(){
            if(this.familyOption!==''){
                return this.sortedAndSearchPost.filter(el => el.lastName === this.familyOption);
            }else{
                return this.sortedPost.filter(post=>(post.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) || post.lastName.toLowerCase().includes(this.searchValue.toLowerCase())));
            }
        }
    }
}
const app = Vue.createApp(App);
app.mount('#app');