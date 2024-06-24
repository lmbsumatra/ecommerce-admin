import multiparty from 'multiparty';
import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';
import { mongooseConnect } from "@/lib/mongoose";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

const owner = 'lmbsumatra';
const repo = 'ecommerce-admin';
const branch = 'main'; // Or any other branch you want to use

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const links = [];
  for (const file of files.file) {
    const fileContent = fs.readFileSync(file.path);
    const ext = path.extname(file.originalFilename);
    const newFilename = `${Date.now()}${ext}`;
    const filePath = `images/${newFilename}`;

    // Get the SHA of the file if it already exists (required for updating a file)
    let sha;
    try {
      const { data: existingFile } = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
      });
      sha = existingFile.sha;
    } catch (error) {
      // File does not exist
    }

    // Create or update the file
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `Upload ${newFilename}`,
      content: fileContent.toString('base64'),
      branch,
      sha, // Include sha only if updating an existing file
    });

    const link = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
