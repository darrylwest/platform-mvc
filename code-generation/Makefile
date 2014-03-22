
all:
	@make npm
	@make test

npm:
	@npm install
	npm install node-commons

test:
	@( grunt test jshint )

watch:
	@( grunt server )

jshint:
	@( grunt jshint )

version:
	@( cd app ; node app --version )

.PHONY:	unit
.PHONY:	npm
.PHONY:	watch
.PHONY:	test
.PHONY:	version
