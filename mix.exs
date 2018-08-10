defmodule ElixirPlugTuto.MixProject do
  use Mix.Project

  def project do
    [
      app: :elreactordelamuerte,
      version: "0.1.0",
      elixir: "~> 1.6",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :plug, :cowboy, :poison],
      mod: {ElixirPlugTuto, []},
      env: [cowboy_port: 7000],
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
      {:plug, "~> 1.0"},
      {:cowboy, "~> 1.0.0"},
      {:poison, "~> 3.1", override: true},
    ]
  end
end