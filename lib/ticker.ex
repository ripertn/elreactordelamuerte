defmodule Ticker do
  use GenServer

  def start_link(opts \\ []), do: GenServer.start_link(__MODULE__, :ok, opts)
  def getState(server), do: GenServer.call(server, {:getState})
  def getTick(server), do: GenServer.call(server, {:getTick})
  def reset(server), do: GenServer.call(server, {:reset})
  def stop(server), do: GenServer.stop(server, {:stop})
  
  def init(:ok) do
    snake = "NR89"
    schedule_work()
    {:ok, {snake, 0}}
  end

  def handle_call({:getState}, _from, state), do: {:reply, state, state}
  def handle_call({:getTick}, _from, state), do: {:reply, elem(state,0), state}

  def handle_info(:work, {snake, time}) do
    schedule_work()
    File.write!("./priv/tick.json", Poison.encode!(%{str: snake}))
    snake = rem(time,300000)==0 && "NR89" || snake 
    {:noreply, {snake <> "+-", time+300}}
  end

  def handle_info(:reset, {_, time}) do
    {:noreply, {"NR89" , time+300}}
  end

  def handle_info(:stop, _) do
    GenServer.stop(self(), :normal)
    {:noreply, nil}
  end

  def handle_info(_msg, state), do: {:noreply, state}

  defp schedule_work(), do: Process.send_after(self(), :work, 300) # every 100ms

end