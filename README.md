# ![Repo Linter](https://raw.githubusercontent.com/todogroup/repolinter/master/docs/images/P_RepoLinter01_logo_only.png)

# Code Climate Repo Linter Engine

`codeclimate-repolinter` is a Code Climate engine that wraps [The TODO Group](http://todogroup.org/)'s [Repo Linter][repolinter]. You can run
it on your command line using the Code Climate CLI, or on our hosted analysis
platform.

Repo Linter is a language-agnostic tool for identifying and reporting common repository issues. It can be configured using a configuration file similar to [this one](https://raw.githubusercontent.com/todogroup/repolinter/master/rulesets/default.json). For information on what issues can be detected, see the [README][repolinter]

### Installation

1. If you haven't already, [install the Code Climate CLI][CLI]

2. Run `codeclimate engines:enable repolinter`. This command both installs the
   engine and enables it in your `.codeclimate.yml` file

3. You're ready to analyze! Browse into your project's folder and run
   `codeclimate analyze`

[cli]: https://github.com/codeclimate/codeclimate

### Configuration

#### `default_file`

By default, this engine will use your `.codeclimate.yml` file as the path for an issue if that issue does not have a specific file to link it to. This can happen, for example, with rules that are ensuring a certain file exists, but it does not. You can override that default file like so: 

```yaml
repolinter:
  enabled: true
  config:
    default_file: '.codeclimate.yml'
```


### Need help?

For help with Repo Linter, [check out their README][repolinter].

If you're running into a Code Climate issue, first look over this project's
[GitHub Issues][issues], as your question may have already been covered. If not,
[go ahead and open a support ticket with us][help].

[issues]: https://github.com/jwsloan/codeclimate-repolinter/issues
[help]: https://codeclimate.com/help

[repolinter]: https://github.com/todogroup/repolinter
