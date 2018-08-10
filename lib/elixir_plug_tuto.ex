defmodule ElixirPlugTuto do
  use Application
  require Logger

  def start(_type, _args) do
    port = Application.get_env(ElixirPlugTuto, :cowboy_port, 7000)

    children = [
      Plug.Adapters.Cowboy.child_spec(:http, PlugEx.Router, [], port: port)
    ]

    Logger.info "App started! "

    Supervisor.start_link(children, strategy: :one_for_one)
  end
end