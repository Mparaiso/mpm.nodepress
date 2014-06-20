test:
	@npm test & 
ct:
	@npm run "continuous-testing" &
start:
	@npm start &
commit:
	@git add .
	@git commit -am"${message} `date`" || :
push: commit
	@git push 
install:
	@npm install
.PHONY: test
