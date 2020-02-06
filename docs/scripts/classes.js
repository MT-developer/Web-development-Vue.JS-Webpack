var classes = new Vue({
    el: '#classes',
    data: classes,
    methods: {
        get_login_state : function () {
            console.log('get');
            return localStorage.getItem( 'loginState' );
        }
    }
})


