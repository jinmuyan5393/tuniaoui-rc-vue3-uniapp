import inquirer from 'inquirer';
import { execSync } from 'child_process';

// 选择版本
export const inquireVersion = async () => {
  const { version } = await inquirer.prompt({
    type: 'list',
    name: 'version',
    message: 'Please select the release version from list',
    default: 'patch',
    choices: ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease'],
  });
  return version;
};

async function initRelease() {
  // 获取当前的更新类型
  // version: major:minor:patch  
  const version = await inquireVersion();
  console.log("🚀 ~ initRelease ~ version:", version)
  
  // 更改版本号， 将当前版本做tag标记并提交
  execSync(`standard-version --release-as ${version}`, { stdio: 'inherit' });

  // 提交代码并发布
  execSync("git push --follow-tags origin master && npm publish --access=public");
}

initRelease();

