import {
  projects as projectDocuments,
  writing as writingDocuments,
} from "collections/server"

export function getProjectMdxDocuments() {
  return projectDocuments
}

export function getWritingMdxDocuments() {
  return writingDocuments
}
