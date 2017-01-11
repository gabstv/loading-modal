package main

import (
	"github.com/tdewolff/minify"
	"github.com/tdewolff/minify/js"
	"os"
)

func main() {
	df, err := os.OpenFile("loadingmodal.min.js", os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0755)
	if err != nil {
		panic(err)
	}
	defer df.Close()
	sf, err := os.Open("src/loadingmodal.js")
	if err != nil {
		panic(err)
	}
	defer sf.Close()
	//
	m := minify.New()
	m.AddFunc("text/javascript", js.Minify)
	if err := m.Minify("text/javascript", df, sf); err != nil {
		print("bad\n")
		panic(err)
	}
}
