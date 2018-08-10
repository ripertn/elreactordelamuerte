defmodule ElixirPlugTutoTest do
  use ExUnit.Case
  doctest ElixirPlugTuto

  test "greets the world" do
    assert ElixirPlugTuto.hello() == :world
  end
end
