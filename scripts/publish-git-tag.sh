#!/bin/bash

set -o pipefail -o nounset -o errexit

workspace="$1"

current_branch=$(git rev-parse --abbrev-ref HEAD)
expected_branch="master"
if [[ "$current_branch" != "$expected_branch" ]] && [[ "$current_branch" != release/v* ]]; then
	# Due to an old bug in npm, the prepublish step is used even when we are not publishing.
	# For packages/graphql-gateway, we need to do the prepack step without the prepublish step.
	# In that case, we are exiting with 0.
	if [[ "$workspace" == "packages/graphql-gateway" ]]; then
		echo "Not on $expected_branch branch. Not publishing git tag, but continue for that workspace"
		exit 0
	else
		echo "Not on $expected_branch branch (was $current_branch)"
		exit 1
	fi
fi

if [[ ! -d "$workspace" ]]; then
	echo "Workspace does not exist: $workspace"
	exit 1
fi

manifest_path="$workspace/package.json"

package="$(jq -r .name $manifest_path)"
if [[ -z "$package" ]]; then
	echo "workspace at $workspace has no package name"
	exit 1
fi

version="$(jq -r .version $manifest_path)"
if [[ -z "$version" ]]; then
	echo "package $package has no version"
	exit 1
fi

# This format is chosen for two reasons:
# * Using the package name (not the workspace dir) because the package name is part of the public API.
# * Using a `/` as a separator to allow tools (e.g., Git GUIs) to easily group tags by package name
tag="$package/$version"
ref="refs/tags/$tag"

if git fetch --tags && git show-ref --quiet --verify "$ref"; then
	echo "Tag already exists: $tag"
	echo "Nothing to do"
	exit 0
fi

echo "Creating tag: $tag"
git tag --annotate --message="$package v$version" "$tag"

echo "Pushing tag: $tag"
git push origin "$tag"
