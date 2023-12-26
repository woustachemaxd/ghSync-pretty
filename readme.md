 #ghsync -h
 ```
\x1b[31m          __   _____\x1b[0m                 
\x1b[31m   ____ \x1b[0m_\x1b[31m/ /_\x1b[0m \x1b[31m/ ___/__\x1b[0m \x1b[31m______  _____\x1b[0m
\x1b[32m  / __ \`/\x1b[0m __ \\\x1b[32m \\__ \\/\x1b[0m \x1b[32m/ / / __ \\/ ___/\x1b[0m
\x1b[33m / /_/ /\x1b[0m / / /\x1b[33m__/ /\x1b[0m \x1b[33m/ /_/ / / / / /__\x1b[0m  
\x1b[34m \\__, /\x1b[0m_/ /_/\x1b[34m____/\x1b[0m\x1b[34m\\__, /\x1b[0m\x1b[34m/_/ /_/\\___/\x1b[0m  
\x1b[35m/____/\x1b[0m           \x1b[35m/____/\x1b[0m              
``

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

```