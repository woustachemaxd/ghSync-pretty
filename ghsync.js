#!/usr/bin/env node

const { Command } = require('commander');
const { exec } = require('child_process');
const fs = require('fs');

const printError = (message) => console.error(`\x1b[31mError: ${message}\x1b[0m\n`);
const printSuccess = (message) => console.log(`\x1b[32m${message}\x1b[0m`);

console.log(`
\x1b[31m          __   _____\x1b[0m                 
\x1b[31m   ____ \x1b[0m_\x1b[31m/ /_\x1b[0m \x1b[31m/ ___/__\x1b[0m \x1b[31m______  _____\x1b[0m
\x1b[32m  / __ \`/\x1b[0m __ \\\x1b[32m \\__ \\/\x1b[0m \x1b[32m/ / / __ \\/ ___/\x1b[0m
\x1b[33m / /_/ /\x1b[0m / / /\x1b[33m__/ /\x1b[0m \x1b[33m/ /_/ / / / / /__\x1b[0m  
\x1b[34m \\__, /\x1b[0m_/ /_/\x1b[34m____/\x1b[0m\x1b[34m\\__, /\x1b[0m\x1b[34m/_/ /_/\\___/\x1b[0m  
\x1b[35m/____/\x1b[0m           \x1b[35m/____/\x1b[0m              
`);



const initializeGit = () => {
    exec('git init', (error) => {
        if (error) {

            console.log(error)
            printError('Failed to initialize Git repository.');
            process.exit(1);
        }
        exec('git add .', (error) => {
            if (error) {

                console.log(error)
                printError('Failed to add files to the Git repository.');
                process.exit(1);
            }
            const commitMessage = program.message || 'Initial commit';
            exec(`git commit -m "${commitMessage}"`, (error) => {
                if (error) {

                    console.log(error)
                    printError('Failed to make the initial commit.');
                    process.exit(1);
                }
                printSuccess('Git repository initialized and committed successfully!');
            });
        });
    });
};
const program = new Command();

const open = program.command('open');
const deletegh = program.command('deletegh');
const deleteall = program.command('deleteall');

deleteall
    .description('Delete GitHub and Git repositories')
    .action(() => {
        exec('gh repo delete --yes', (error, stdout) => {
            if (error) {
                printError("couldn't delete Github Repo");
                console.log(error);
                process.exit(1);
            }
            console.log(`☠️ GitHub repository deleted successfully!`)
            exec('shx rm -rf .git', (error, stdout) => {
                if (error) {
                    printError("couldn't delete Git Repo");
                    console.log(error);
                    process.exit(1);
                }
                console.log(`💀 Git repository deleted successfully!`)
            })
        })
    })

deletegh
    .description('Delete GitHub repo')
    .action(() => {
        exec('gh repo delete --yes', (error, stdout) => {
            if (error) {
                printError("couldn't delete Github Repo");
                console.log(error);
                process.exit(1);
            }
            console.log(`☠️ GitHub repository deleted successfully!`)
        })
    })

open
    .description('Opens the remote repository in the browser.')
    .action(() => {
        exec('git remote get-url origin', (error, stdout) => {
            if (error) {
                printError('Git repository not initialized.');
                console.log(error)
                process.exit(1);
            }
            const originPath = stdout.trim();
            exec(`gh repo view --web ${originPath}`, (error) => {
                if (error) {
                    printError('Failed to open the remote repository.');
                    console.log(error)
                    process.exit(1);
                }
                console.log(`🌐 Opening the remote repository in the browser... \n ${originPath}`)
            });
        });
    });

const sync = program.command('sync');

sync
    .description('Pushes changes to the remote repository.')
    .requiredOption('-m, --message <message>', 'Git commit message')
    .action((options) => {
        const { message } = options;
        exec('git status', (error) => {
            if (error) {
                printError('Git repository not initialized.');
                console.log(error)
                process.exit(1);
            }
            exec('git add .', (error) => {
                if (error) {
                    printError('Failed to add files to the Git repository.');
                    console.log(error)
                    process.exit(1);
                }
                exec(`git commit -m "${message}"`, (error) => {
                    if (error) {
                        printError('Failed to commit changes.');
                        console.log(error)
                        process.exit(1);
                    }
                    exec('git push', (error) => {
                        if (error) {
                            printError('Failed to push changes to the remote repository.');
                            console.log(error)
                            process.exit(1);
                        }
                        printSuccess('🚀 Changes pushed successfully!');
                    });
                });
            });
        })
    });



program
    .version('1.0.0')
    .description('🚀 This Node.js command-line tool automates Git repository initialization, initial commit, and GitHub remote creation with customizable options. 🌐')
    .option('-s, --source <source>', 'Source directory, default is the current directory', '.')
    .option('--public', 'Create a public repo')
    .option('--private', 'Create a private repo')
    .option('--message <message>', 'Git commit message')
    .option('--name <name>', 'Specify the repository name, default is the directory name')
    .option('--description <description>', 'Specify the repository description')
    .option('--owner <owner>', 'Specify the repository owner')
    .action((options) => {
        let { public: isPublic, private: isPrivate, source, message, name, description, owner } = options;

        if (!(isPublic || isPrivate)) {
            printError('Specify either --public or --private, not both or none.');
            program.help();
        }

        const visibility = isPublic ? 'Public' : 'Private';
        name = name || process.cwd().split('\\').pop();
        source = source == '.' ? process.cwd() : source
        console.log(`🚧 Repository Name: ${name}`);
        description && console.log(`📝 Description: ${description}`);
        owner && console.log(`👤 Owner: ${owner}`);
        console.log(`👀 Visibility: ${visibility}`);
        console.log(`📂 Source: ${source}`);
        if (description) {
            fs.appendFile(`${source}/README.md`, description, function (err) {
                if (err) throw err;
            });
        }
        if (owner) {
            fs.appendFile(`${source}/README.md`, `Owner: ${owner}`, function (err) {
                if (err) throw err;
            });
        }

        if (source != '.')
            exec(`cd ${source}`, (error) => {
                if (error)
                    printError(error);
            })
        exec('git status', (error) => {
            if (error) {
                initializeGit();
            } else if (message) {
                exec('git add .', (error) => {
                    if (error) {

                        console.log(error)
                        printError('Failed to add files to the Git repository.');
                        process.exit(1);
                    }
                    exec(`git commit -m "${message}"`, (error) => {
                        if (error) {

                            console.log(error)
                            printError('Failed to commit changes.');
                            process.exit(1);
                        }
                        printSuccess('🚀 Changes committed successfully!');
                    });
                });
            }
            //after everything
            exec(`gh repo create "${name}" ${isPublic ? '--public' : '--private'}`, (error, stdout) => {
                if (error) {

                    console.log(error)
                    printError('Failed to create the remote repository.');
                    process.exit(1);
                }
                const originPath = stdout.trim();
                exec('git branch -M main', (error) => {
                    if (error) {

                        console.log(error)
                        printError('Failed to rename the default branch to main.');
                        process.exit(1);
                    }
                    exec(`git remote add origin ${originPath}`, (error) => {
                        if (error) {
                            console.log(error)
                            printError('Failed to add the remote repository.');
                            process.exit(1);
                        }
                        exec('git push -u origin main', (error) => {
                            if (error) {
                                console.log(error)
                                printError('Failed to push changes to the remote repository.');
                                process.exit(1);
                            }
                            printSuccess('🎉 Repository created and changes pushed successfully!');
                        });
                    });
                });
            });
        });

    })

program.parse(process.argv);
