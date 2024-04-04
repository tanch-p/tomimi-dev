git reset HEAD^
git restore .
git rebase main
npm run build
git add .
git commit -m "build"
git push -f origin aliyun