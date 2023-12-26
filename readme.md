 #ghsync -h
 ```
<span style="color:red">          __   _____</span>
<span style="color:red">   ____ _/ /_/ /_ / ___/__  ______  _____</span>
<span style="color:green">  / __ \`/ __ \ \__ \/ / / / __ \/ ___/</span>
<span style="color:yellow"> / /_/ / / / /__/ / /_/ / / / / /__</span>
<span style="color:blue"> \__, /_/ /_/____/\__, /_/ /_/ \___/</span>
<span style="color:purple">/____/           /____/</span>
<span style="color:red">          __   _____</span>
<span style="color:red">   ____ _/ /_/ /_ / ___/__  ______  _____</span>
<span style="color:green">  / __ \`/ __ \ \__ \/ / / / __ \/ ___/</span>
<span style="color:yellow"> / /_/ / / / /__/ / /_/ / / / / /__</span>
<span style="color:blue"> \__, /_/ /_/____/\__, /_/ /_/ \___/</span>
<span style="color:purple">/____/           /____/</span>


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