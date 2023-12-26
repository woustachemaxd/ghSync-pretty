 ghsync -h
 ```

          __   _____
   ____ _/ /_ / ___/__ ______  _____
  / __ `/ __ \ \__ \/ / / / __ \/ ___/
 / /_/ / / / /__/ / / /_/ / / / / /__  
 \__, /_/ /_/____/\__, //_/ /_/\___/  
/____/           /____/

```

Usage: ghsync [options] [command]

🚀 This Node.js command-line tool automates Git repository initialization, initial commit, and GitHub remote creation with customizable options. 🌐

Options:
  -V, --version                output the version number
  -s, --source <source>        Source directory, default is the current directory (default: ".")
  --public                     Create a public repo
  --private                    Create a private repo
  --message <message>          Git commit message
  --name <name>                Specify the repository name, default is the directory name
  --description <description>  Specify the repository description
  --owner <owner>              Specify the repository owner
  -h, --help                   display help for command

Commands:
  sync [options]               Pushes changes to the remote repository.