package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
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

}
