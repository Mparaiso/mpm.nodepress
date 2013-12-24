test:
	@mocha 
	make commit
commit:
	@git add .
	@git commit -am"auto-commit `date`" || :
push: commit
	@git push origin --all
run:
	@DEBUG=express:* supervisor app.js &
install:
	@npm install