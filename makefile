test:
	@mocha 
	make commit
commit:
	@git add .
	@git commit -am"auto-commit `date`" || :