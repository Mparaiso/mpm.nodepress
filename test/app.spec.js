/*jslint eqeq:true,node:true,es5:true,white:true,plusplus:true,nomen:true,unparam:true,devel:true,regexp:true */
describe('$',function(){
    beforeEach(function(){
        this.$=require('../app');
    });
    it('$.mongoose',function(){
        expect(this.$.mongoose).toBeDefined();
    });
});
