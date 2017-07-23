package main

import (
	"encoding/json"
	"github.com/donkeysharp/eazy-panel/services"
	"net/http"
)

func clusterHandler(w http.ResponseWriter, r *http.Request) {
	clusters, _ := services.GetECSClustersByPattern("reconmvs", true)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(clusters)
}

func taskDefinitionHandler(w http.ResponseWriter, r *http.Request) {
	taskArn := r.URL.Query().Get("arn")
	w.Header().Set("Content-Type", "application/json")

	if len(taskArn) == 0 {
		w.Write([]byte("null"))
		return
	}

	taskDefinition, _ := services.GetECSTaskDefinitionByArn(&taskArn)

	json.NewEncoder(w).Encode(taskDefinition)
}

func main() {
	http.HandleFunc("/api/clusters", clusterHandler)
	http.HandleFunc("/api/taskDefinition", taskDefinitionHandler)
	http.ListenAndServe(":8000", nil)
}
