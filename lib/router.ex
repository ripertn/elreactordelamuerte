defmodule PlugEx.Router do
  use Plug.Router

  plug :match
  plug :dispatch
  plug Plug.Static, at: "/home", from: :server

  def init(str) do
    {:ok, pid} = Ticker.start_link
    {:ok, pid, str}
  end

  # get "/bundle.js" do
  #   conn = put_resp_content_type(conn, "text/js")
  #   send_file(conn, 200, "priv/bundle.js")
  # end
  get "/todo.bundle.js", do: put_resp_content_type(conn, "text/js") |> send_file(200, "priv/todo.bundle.js")
  get "/autorefresh.bundle.js", do: put_resp_content_type(conn, "text/js") |> send_file(200, "priv/autorefresh.bundle.js")
  get "/tick.json", do: put_resp_content_type(conn, "text/json") |> send_file(200, "priv/tick.json")

  get "/", do: send_resp(conn,200,"Fuck you")
  get "/fuck", do: send_resp(conn, 200, "fucking fuck you")
  get "/about/:user_name", do: send_resp(conn, 200, "Fuck you #{user_name}")
  get "/auto-refresh", do: put_resp_content_type(conn, "text/html") |> send_file(200, "priv/autorefresh.html")
  get "/todo", do: put_resp_content_type(conn, "text/html") |> send_file(200, "priv/todo.html")
  get "/home", do: put_resp_content_type(conn, "text/html") |> send_file(200, "priv/index.html")

  match _ , do: send_resp(conn, 404, "Fuck you 404 ")
end