import * as core from '@actions/core';
import * as github from '@actions/github';

const getLastSuccessfulWorkflowCommit = async () => {
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const branch = core.getInput('branch');
    const event = core.getInput('event');
    const ghToken = core.getInput('github_token');
    const workflowFilename = core.getInput('workflow_filename');

    const octokit = github.getOctokit(ghToken);

    try {
        // response spec: https://docs.github.com/en/rest/actions/workflow-runs#list-workflow-runs-for-a-workflow
        const response = await octokit.rest.actions.listWorkflowRuns({
            owner,
            repo,
            workflow_id: workflowFilename,
            event: event || 'push',
            branch,
            status: 'success',
        });

        const successfulWorkflowRuns = response.data.workflow_runs;

        if (successfulWorkflowRuns.length < 1) {
            throw new Error('No successful workflow runs');
        }

        const lastSuccessCommitHash = successfulWorkflowRuns[0].head_sha;

        core.setOutput('commit_hash', lastSuccessCommitHash);
    } catch (error) {
        core.setFailed(`[last-successful-workflow-commit] failed with error: ${error}`);
    }
};

getLastSuccessfulWorkflowCommit();
