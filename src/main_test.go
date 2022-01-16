package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"fmt"
	"os"
)

func TestGETHome(t *testing.T) {

	
	t.Run("returns 200 status code", func(t *testing.T) {
		request, _ := http.NewRequest(http.MethodGet, "/", nil)
		response := httptest.NewRecorder()

		home(response, request)

		got := response.Result().StatusCode
		want := 200

		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})

	t.Run("returns welcome message", func(t *testing.T) {
		request, _ := http.NewRequest(http.MethodGet, "/", nil)
		response := httptest.NewRecorder()

		home(response, request)

		got := response.Body.String()
		want := "Welcome to Contino's Good Software Delivery"

		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})

	rc :=0

    if testing.CoverMode() != "" {
        c := testing.Coverage()
        if c < 0.15 {
            fmt.Println("Tests passed but test-coverage below threshold of at least 15%. Current test-coverage is: ", c)
            rc = -1
        }
	}
	
    os.Exit(rc)

}
