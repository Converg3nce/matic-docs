# setup virtual env
VENV="venv"
if [ ! -d "$VENV" ]; then
  echo "SETUP: setting up virtual env for python"
  virtualenv venv
fi

# activate virtual env
echo "SETUP: activating virtual env for python"
source venv/bin/activate

# getting latest changes from git
# echo "SETUP: fetching latest changes from git"
# git pull origin master

# install all dependencies
echo "SETUP: installing dependencies"
pip install -r requirements.txt

echo "DEPLOY: generating pre-rendered static files"
mkdocs build

HTML="/var/www/docs.matic.network/html"

# remove directory
rm -rf $HTML

if [ ! -d "$HTML" ]; then
  # Create nested directories if $HTML doesn't exist.
  mkdir -p "$HTML"
fi

echo "DEPLOY: copying files from site/ to $HTML"
cp -r site/** "$HTML"

echo "DEPLOY: successful"
